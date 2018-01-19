#!/bin/bash

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
watch -n0.3 "psql -f ${SCRIPTPATH}/db.sql"