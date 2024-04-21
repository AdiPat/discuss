"use server";

import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: "must be lowercase letters or dashes without special chars",
    }),

  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
) {
  const name = formData.get("name");
  const description = formData.get("description");

  const validationResult = createTopicSchema.safeParse({ name, description });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  let topic = null;
  try {
    topic = await db.topic.create({
      data: {
        slug: validationResult.data.name,
        description: validationResult.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something wen't wrong"],
        },
      };
    }
  }

  if (topic) {
    revalidatePath("/");
    redirect(paths.topicShow(topic.slug));
  }

  console.log({ name, description }, validationResult);

  return {
    errors: {},
  };
}
