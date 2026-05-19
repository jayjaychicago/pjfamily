import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const vcf = await readFile(
    join(process.cwd(), "public", "pj_family_contact.vcf"),
    "utf-8"
  );

  return new Response(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="pj_family_contact.vcf"',
    },
  });
}
