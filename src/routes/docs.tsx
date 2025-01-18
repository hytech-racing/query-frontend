import DocumentationVersion from "@/components/DocumentationVersion";

export default function Docs() {
  const versions = ["1.0", "1.1", "2.0", "2.1"]; // Example versions, replace with API later.

  return <DocumentationVersion versions={versions} />;
}
