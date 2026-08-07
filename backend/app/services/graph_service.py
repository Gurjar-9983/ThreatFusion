
from sqlalchemy.orm import Session

from app.models.ioc import IOC


class GraphService:

    @staticmethod
    def build_graph(db: Session):

        iocs = db.query(IOC).all()

        nodes = []
        edges = []

        for ioc in iocs:

            nodes.append(
                {
                    "id": str(ioc.id),
                    "label": ioc.value,
                    "type": ioc.type,
                }
            )

        for index in range(len(iocs) - 1):

            edges.append(
                {
                    "source": str(iocs[index].id),
                    "target": str(iocs[index + 1].id),
                }
            )

        return {
            "nodes": nodes,
            "edges": edges,
        }