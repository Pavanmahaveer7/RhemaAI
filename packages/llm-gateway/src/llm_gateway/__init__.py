"""The only package allowed to call a model."""

from llm_gateway.gateway import GatewayError, breaker, complete, mode, ping

__all__ = ["GatewayError", "breaker", "complete", "mode", "ping"]
