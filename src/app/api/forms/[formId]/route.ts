import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req: Request, { params }: { params: { formId: string } }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const form = await db.form.findFirst({
      where: { id: params.formId, userId },
      include: {
        fields: true,
      },
    });

    if (!form) return new Response("Form not found", { status: 404 });

    return new Response(JSON.stringify(form), {
      status: 200,
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

export async function PUT(req: Request, { params }: { params: { formId: string } }) {
  try {
    const body = await req.json();
    const { title, description, fields } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const form = await db.form.findFirst({
      where: { id: params.formId, userId },
    });

    if (!form) return new Response("Form not found", { status: 404 });

    const updatedForm = await db.form.update({
      where: { id: params.formId },
      data: {
        title,
        description,
        fields: {
          deleteMany: {}, 
          create: fields.map((field: any) => ({
            label: field.label,
            fieldType: field.fieldType,
            options: field.options || [],
          })),
        },
      },
    });

    return new Response(JSON.stringify(updatedForm), {
      status: 200,
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

export async function DELETE(req: Request, { params }: { params: { formId: string } }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const form = await db.form.findFirst({
      where: { id: params.formId, userId },
    });

    if (!form) return new Response("Form not found", { status: 404 });

    await db.form.delete({
      where: { id: params.formId },
    });

    return new Response("Form deleted", {
      status: 204,
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
