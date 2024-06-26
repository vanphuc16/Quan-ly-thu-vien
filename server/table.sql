create table user(
    user_id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    password varchar(250),
    role varchar(20),
    UNIQUE  (email)
);

create table preference(
    user_id int not null,
    preference varchar(50),
    foreign key (user_id) references user(user_id)
);

insert into user(name, email, password, role) values('user1','user1@gmail.com','$2b$10$xCTzAirptwQCWnTc0qswUer59c0zQ7lqQAb0asAFUo335RSpVKlsO', 'USER'),
('admin1','admin1@gmail.com','$2b$10$xCTzAirptwQCWnTc0qswUer59c0zQ7lqQAb0asAFUo335RSpVKlsO', 'ADMIN');

create table book(
    book_id int primary key AUTO_INCREMENT,
    title varchar(250),
    isbn varchar(250),
    author varchar(250),
    publisher varchar(250),
    description varchar(500),
    year varchar(10),
    pdf_link varchar(500),
    image_link varchar(500),
    genre varchar(50),
    admin_user_id int not null,
    UNIQUE (isbn),
    foreign key (admin_user_id) references user(user_id)
);

create table online_read(
    user_id int not null,
    book_id int not null,
    foreign key (user_id) references user(user_id),
    foreign key (book_id) references book(book_id)

);

create table offline_read(
    user_id int not null,
    book_id int not null,
    start_date date,
    end_date date,
    isBorrowed boolean,
    foreign key (user_id) references user(user_id),
    foreign key (book_id) references book(book_id)
);

create table notification(
    notification_id int primary key AUTO_INCREMENT,
    description varchar(500),
    user_id int not null,
    foreign key (user_id) references user(user_id)
);

insert into notification(description, user_id) values("Welcome to Library Management System", 1);

create table review(
    review_id int primary key AUTO_INCREMENT,
    description varchar(500),
    user_id int not null,
    foreign key (user_id) references user(user_id)
);
