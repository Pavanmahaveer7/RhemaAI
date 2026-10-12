"""Build a small idea graph. Nodes are published concepts, never people."""

import networkx as nx

MAX_NODES = 200
MAX_EDGES = 1000
MIN_COUNT = 3


def build_graph(nodes: list[dict], edges: list[dict]) -> nx.Graph:
    graph = nx.Graph()
    for node in nodes[:MAX_NODES]:
        node_id = str(node.get("id") or node.get("label") or "").strip()
        weight = int(node.get("weight") or node.get("count") or 0)
        if not node_id or weight < MIN_COUNT:
            continue
        graph.add_node(
            node_id,
            label=str(node.get("label") or node_id)[:60],
            weight=weight,
            cluster=str(node.get("cluster") or "")[:40] or None,
            is_new=bool(node.get("isNew") or node.get("is_new")),
        )
    for edge in edges[:MAX_EDGES]:
        source = str(edge.get("source") or edge.get("a") or "").strip()
        target = str(edge.get("target") or edge.get("b") or "").strip()
        if not graph.has_node(source) or not graph.has_node(target) or source == target:
            continue
        weight = max(1, int(edge.get("weight") or 1))
        if graph.has_edge(source, target):
            graph[source][target]["weight"] += weight
        else:
            graph.add_edge(source, target, weight=weight, kind=str(edge.get("kind") or "shared")[:20])
    return graph


def neighbors_of(graph: nx.Graph, label: str, k: int = 8) -> dict:
    match = _match_node(graph, label)
    if match is None:
        return {"concept": label, "found": False, "weight": 0, "neighbors": []}
    ranked = []
    for other, data in graph[match].items():
        ranked.append(
            {
                "id": other,
                "label": graph.nodes[other].get("label") or other,
                "weight": int(data.get("weight") or 1),
                "kind": data.get("kind") or "shared",
            }
        )
    ranked.sort(key=lambda item: (-item["weight"], item["id"]))
    return {
        "concept": match,
        "found": True,
        "weight": int(graph.nodes[match].get("weight") or 0),
        "cluster": graph.nodes[match].get("cluster"),
        "neighbors": ranked[:k],
    }


def snapshot_payload(graph: nx.Graph, *, question_id: str, month: str) -> dict:
    nodes = [
        {
            "id": node_id,
            "label": data.get("label") or node_id,
            "weight": int(data.get("weight") or 1),
            "cluster": data.get("cluster"),
        }
        for node_id, data in sorted(graph.nodes(data=True))
    ]
    edges = [
        {"source": a, "target": b, "weight": int(data.get("weight") or 1)}
        for a, b, data in sorted(graph.edges(data=True))
    ]
    return {
        "question_id": question_id,
        "month": month,
        "nodes": nodes[:MAX_NODES],
        "edges": edges[:MAX_EDGES],
        "stats": {"responses_processed": 0, "flagged_inputs": 0, "engine": "networkx"},
    }


def _match_node(graph: nx.Graph, label: str) -> str | None:
    wanted = label.strip().lower()
    if not wanted:
        return None
    if graph.has_node(label):
        return label
    for node_id, data in graph.nodes(data=True):
        if node_id.lower() == wanted or str(data.get("label") or "").lower() == wanted:
            return node_id
    return None
