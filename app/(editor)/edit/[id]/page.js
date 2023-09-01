import { notFound } from "next/navigation";

import Form from "@/components/Form";
import { getItem } from "@/lib/api";

export default async function Edit({ params: { id } }) {
  const ruleset = await getItem(id);
  if (!ruleset) {
    notFound();
  }

  return <Form id={id} {...ruleset} />;
}
