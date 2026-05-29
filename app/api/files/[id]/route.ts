import { readFile } from "node:fs/promises";
import { FileCategory, FileVisibility } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdminUser } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/audit";
import { resolveUploadStoragePath } from "@/lib/upload-storage";

const publicCategories = new Set<FileCategory>([FileCategory.BLOG_COVER]);

export const dynamic = "force-dynamic";

type FileRouteProps = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: FileRouteProps) {
  const record = await prisma.uploadedFile.findUnique({
    where: { id: params.id },
  });

  if (!record) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const isPublic =
    record.visibility === FileVisibility.PUBLIC ||
    publicCategories.has(record.category);

  if (!isPublic) {
    const user = await getAuthenticatedAdminUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await logAuditEvent({
      actorId: user.id,
      action: "file.accessed",
      entityType: "uploadedFile",
      entityId: record.id,
      description: `Secure file accessed: ${record.originalName}.`,
      metadata: {
        visibility: record.visibility,
        category: record.category,
      },
    });
  }

  const absolutePath = resolveUploadStoragePath(record.storagePath);

  try {
    const buffer = await readFile(absolutePath);
    const download = request.nextUrl.searchParams.get("download") === "1";
    const disposition = isPublic && !download ? "inline" : "attachment";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": record.mimeType,
        "Content-Length": String(record.sizeBytes),
        "Content-Disposition": `${disposition}; filename="${record.originalName}"`,
        "Cache-Control": isPublic
          ? "public, max-age=31536000, immutable"
          : "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Stored file is unavailable." }, { status: 404 });
  }
}
