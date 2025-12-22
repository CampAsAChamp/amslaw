import { FormData } from "@/types"
import { render } from "@react-email/components"
import { ContactEmailTemplate } from "./ContactEmailTemplate"

export async function generateContactEmailHTML(data: FormData): Promise<string> {
  return await render(<ContactEmailTemplate {...data} />)
}
