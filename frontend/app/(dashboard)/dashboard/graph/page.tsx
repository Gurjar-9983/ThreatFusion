
import IOCRelationshipGraph from "@/components/graph/IOCRelationshipGraph";

export default function GraphPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">
        IOC Relationship Graph
      </h1>

      <IOCRelationshipGraph />
    </div>
  );
}