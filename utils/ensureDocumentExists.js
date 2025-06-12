export const ensureDocumentExists = (document, name, res) => {
  if (!document) {
    res.status(404);
    throw new Error(`${name} not found`);
  }
}