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

export function buildFParam(obj: Record<string, string | null | undefined>): string {
    return Object.entries(obj)
        .filter(([_, v]) => v != null && v !== "") // filter out null/undefined/empty
        .map(([k, v]) => `${k}:${v}`)
        .join("::");
}
