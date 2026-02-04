import Tesseract from "tesseract.js";

/**
 * Extracts text from an image file using Tesseract.js
 * @param file The image file to process
 * @returns Promise<string> The extracted text
 */
export async function extractTextFromImage(file: File): Promise<string> {
    try {
        const result = await Tesseract.recognize(
            file,
            "eng",
            { logger: (m) => console.log("OCR Progress:", m) } // Optional: detailed logs
        );

        return result.data.text;
    } catch (error) {
        console.error("OCR Failed:", error);
        throw new Error("Failed to extract text from image");
    }
}
