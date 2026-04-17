"""
conftest.py — shared pytest fixtures

Nothing fancy here yet. Add fixtures as the test suite grows —
things like a test database connection or mock SMTP client would live here.
"""
import os
import pytest


@pytest.fixture(autouse=True)
def _no_real_env_vars(monkeypatch):
    """
    Clear sensitive env vars during tests so we never accidentally
    make real API calls or send real emails in the test suite.
    """
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)
    monkeypatch.delenv("SMTP_PASSWORD",      raising=False)
    monkeypatch.delenv("SMTP_USER",          raising=False)
