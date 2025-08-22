create table users (
  id uuid,
  username varchar(100) unique primary key not null,
  access_token varchar(250) not null,
  email varchar(50),
  telp varchar(50),
);

create table companies (
    id uuid primary key,
    user_id varchar(100),
    company_code varchar(50),
    company_name varchar(100),
    foreign key (user_id) references users(username)
);

insert into users (id, username, email, telp) values
('80887e5f-7d5d-4cf4-9810-5cd1e7961b6d', 'imron', null, '081234567890'),
('815cb7b7-eab9-4204-bca4-42fa03860127', 'juli', 'sammy@mail.com', '0987654321');
(null, 'Gajah Mada', '', '');


insert into companies (id, user_id, company_code, company_name) values
("ed04a171-d5df-494d-9cc0-0d429acb757c", "Imron", "SPI", ""),
("8c6b56d3-142d-4362-b6b6-d0cafb94834b", "Juli", "PIC", "Samudera"),
("e759c4ec-9107-4339-b747-fc1abedf61dc", "", "", "Samudera")


