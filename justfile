default:
    just --list

fmt:
    poetry run ruff format

lint:
    poetry run ruff check .

test:
    poetry run pytest

check:
    just fmt
    just lint
    just test
