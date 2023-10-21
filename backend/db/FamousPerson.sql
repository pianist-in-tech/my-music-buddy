\echo 'Delete and recreate famousperson db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE famousperson;
CREATE DATABASE famousperson;
\connect famousperson

\i famousperson-schema.sql
\i famousperson-seed.sql