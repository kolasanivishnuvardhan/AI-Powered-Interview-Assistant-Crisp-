import pdf from 'pdf-parse';
import { Candidate } from '../types/candidate';

// mammoth does not have official TypeScript type definitions, so we use require.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mammoth = require('mammoth');

// Regular expressions for extracting information
const EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
// This is a simple regex and might not capture all name formats correctly.
// It looks for two capitalized words, which is a common pattern for names.
const NAME_REGEX = /([A-Z][a-z']+\s[A-Z][a-z']+)/;

/**
 * Extracts candidate information from raw text using regular expressions.
 * @param text The raw text from the resume.
 * @returns A Candidate object with the extracted information.
 */
const extractInfoFromText = (text: string): Candidate => {
  const emailMatch = text.match(EMAIL_REGEX);
  const phoneMatch = text.match(PHONE_REGEX);
  const nameMatch = text.match(NAME_REGEX);

  return {
    name: nameMatch ? nameMatch[0].trim() : null,
    email: emailMatch ? emailMatch[0].trim() : null,
    phone: phoneMatch ? phoneMatch[0].trim() : null,
  };
};

/**
 * Parses a resume file (PDF or DOCX) to extract text and candidate information.
 * @param file The resume file to parse.
 * @returns A promise that resolves to a Candidate object.
 */
export const parseResume = async (file: File): Promise<Candidate> => {
  const fileType = file.type;
  let text = '';

  try {
    if (fileType === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const data = await pdf(arrayBuffer);
      text = data.text;
    } else if (
      fileType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      text = result.value;
    } else {
      throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
    }

    if (!text) {
      throw new Error('Failed to extract text from the file.');
    }

    return extractInfoFromText(text);
  } catch (error) {
    console.error('Error parsing resume:', error);
    if (error instanceof Error) {
      throw new Error(`Parsing failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred during parsing.');
  }
};