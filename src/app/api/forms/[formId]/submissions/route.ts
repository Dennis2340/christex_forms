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

export async function GET(req: Request, { params }: { params: { formId: string } }) {
  try {
    
    const submissions = await db.submission.findMany({
      where: { formId: params.formId },
    });

    if (!submissions || submissions.length === 0) {
      return new Response("No submissions found for this form", { status: 404 });
    }

    return new Response(JSON.stringify(submissions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching form submissions:", error);
    return new Response(
      JSON.stringify({ message: "Error occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
