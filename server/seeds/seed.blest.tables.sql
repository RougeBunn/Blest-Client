BEGIN;

TRUNCATE

blest_list,
blest_users
RESTART IDENTITY CASCADE;


INSERT INTO blest_users (user_name, full_name, password)
VALUES
    ('jack123@yahoo.com', 'Jack Brown', '$2a$12$vKTIjHxmwqfuSwtQLL6t4.bhjgdFQcT6HdZAc.oHfQjugZGv3fwQy'),
    ('kevin123@yahoo.com', 'Kevin Tyler', '$2a$12$wpC482LxFpBqPmEIPbLBquQD6UwC44./Yx1y2XN14fMLKO16a/Pqe'),
    ('lisa123@yahoo.com', 'Lisa Smith', '$2a$12$qVySk4BNSdOGcMZfD0bq.uUaKEEiuyCtNpZHn9oIE.b0iW2Ql7gRG'),
    ('sara123@yahoo.com', 'Sara Thompson', '$2a$12$KZwaeHg3prodpFSEdWeY7.sW3.iM137tpKsrIqrxJoPUw5fdowKcW'),
    ('john123@yahoo.com', 'John Connor', '$2a$12$giZ6CdpLLf5hq/Qz6wI.mOit3ioUDj2vmRy22HSNVPYFoiBdJyZLq'),
    ('meg123@yahoo.com', 'Meg Jackson', '$2a$12$u1Hg81e.2MMgqLA5vIvs3.rUfNwMCKxeyhkHEJ11Py1LXQiP7phTS'),

COMMIT;