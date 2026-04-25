import { NextResponse } from "next/server";

export function toApiSuccessResponse<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}
