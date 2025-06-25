export function parseFParam(f: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!f) return result;

  f.split("::").forEach((entry) => {
    const [key, value] = entry.split(":");
    if (key && value) {
      result[key] = value;
    }
  });

  return result;
}

export function buildFParam(obj: Record<string, string>): string {
  return Object.entries(obj)
    .filter(([_, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}:${v}`)
    .join("::");
}
