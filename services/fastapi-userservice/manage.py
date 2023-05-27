#!/usr/bin/env python
"""User Service command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    try:
        from app.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Management Utility"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()