import { db } from "@/db";

export async function POST(req: Request, { params }: { params: { formId: string } }) {
  try {
    const body = await req.json();
    const { data } = body;

    const form = await db.form.findUnique({
      where: { id: params.formId },
    });

    if (!form) return new Response("Form not found", { status: 404 });

    const newSubmission = await db.submission.create({
      data: {
        formId: params.formId,
        data,
      },
    });

    return new Response(JSON.stringify(newSubmission), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
