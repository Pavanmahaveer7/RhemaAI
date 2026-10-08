"""The only package allowed to call a model."""

from llm_gateway.gateway import (
    GatewayError,
    breaker,
    complete,
    embed,
    embed_dim,
    embed_mode,
    embed_model_id,
    mode,
    ping,
)

__all__ = [
    "GatewayError",
    "breaker",
    "complete",
    "embed",
    "embed_dim",
    "embed_mode",
    "embed_model_id",
    "mode",
    "ping",
]
