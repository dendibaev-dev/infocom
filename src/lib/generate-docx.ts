import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { convertStringToSnakeCase } from "./utils";

interface TableRow {
  [key: string]: string | number | boolean;
}

interface TemplateData {
  [key: string]: string | number | boolean | TableRow[];
}

async function loadTemplate(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

export async function generateDocx(data: TemplateData): Promise<void> {
  try {
    const templateArrayBuffer = await loadTemplate("/doc.docx");

    const zip = new PizZip(templateArrayBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(data);

    const blob = new Blob([doc.getZip().generate({ type: "arraybuffer" })], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(blob, `${convertStringToSnakeCase(data.fullName as string)}.docx`);
  } catch (error) {
    console.error("Ошибка при генерации документа:", error);
  }
}
