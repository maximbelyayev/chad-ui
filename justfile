default:
  just --list

lint:
  ruff check .

test:
  poetry run pytest

check:
  just lint
  just test