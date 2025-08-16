--rollback;
--COMMIT;
--BEGIN TRANSACTION;
 --DELETE FROM videos WHERE id=3;
--insert into videos (id) values (DEFAULT);
--alter table videos add column title text;
--ALTER TABLE videos ADD CONSTRAINT id UNIQUE (id);
--update videos set description = 'my cool vid' where id=1;



select * from videos;
/*
-- todo blogs (just special forum types)
create table forums (
    id serial primary key not null unique,
    owneruser_id serial not null references users(id),
    user_id serial not null references users(id),
    forum_links references forum_forums(forum_links);
)
create table forum_forums (
    id serial primary key not null unique,
    child_forum_id serial not null references users(id),
)
create table forum_posts (
    id serial primary key not null unique,
    user_id serial not null references users(id),
    user_id serial not null references users(id),
)
*/

-- websocket/htmx/sse
-- party
-- messages (dms + lobbies to hang out in)



/*
create table video_comments (
    id serial primary key not null unique,
    video_id serial not null,
    comment text not null,
    create_dt date default now(),
    author text not null
);
*/ -- PostgreSQL(v11)
 /*
ALTER TABLE video_comments ADD CONSTRAINT fk_video_id
FOREIGN KEY (video_id) REFERENCES videos (id);
*/ /*
insert into video_comments (video_id, comment, author)
values (3, 'this video sucks', 'yomama');

*/ /*
-- add column
alter table videos
ADD COLUMN name type;
*/ --
 /*

-- enable default
alter table videos
ALTER COLUMN create_dt
set default now();
*/ /*
-- reset values to default
update videos
set create_dt = default;
*/ /*
select video.title,
       comment.*
From videos video
INNER JOIN video_comments comment on video.id = comment.video_id
where video.id = 3;
*/ -- generate session token

--
 --insert into users return session_token;
 -- validate session token