-- DATABASE TESTS

begin;
select plan( 35 );

-- CHECK THAT ALL COLUMNS EXIST IN THE DATABASE
select has_column('enquiries', 'id');
select has_column('enquiries', 'text');
select has_column('enquiries', 'replies');
select has_column('enquiries', 'username');
select has_column('enquiries', 'isAdmin');

select has_column('fountain_allergens', 'created_at');
select has_column('fountain_allergens', 'name');
select has_column('fountain_allergens', 'nuts');
select has_column('fountain_allergens', 'cereals');
select has_column('fountain_allergens', 'lupin');
select has_column('fountain_allergens', 'soya');
select has_column('fountain_allergens', 'egg');
select has_column('fountain_allergens', 'fish');
select has_column('fountain_allergens', 'crustaceans');
select has_column('fountain_allergens', 'molluscs');
select has_column('fountain_allergens', 'celery');
select has_column('fountain_allergens', 'peanuts');
select has_column('fountain_allergens', 'sesame_seeds');
select has_column('fountain_allergens', 'sulphur_dioxide');
select has_column('fountain_allergens', 'vegetarian');
select has_column('fountain_allergens', 'vegan');
select has_column('fountain_allergens', 'halal');
select has_column('fountain_allergens', 'milk');
select has_column('fountain_allergens', 'mustard');
select has_column('fountain_allergens', 'description');

select has_column('fountain_allergens_ratings', 'id');
select has_column('fountain_allergens_ratings', 'created_at');
select has_column('fountain_allergens_ratings', 'dish_id');
select has_column('fountain_allergens_ratings', 'user_id');
select has_column('fountain_allergens_ratings', 'rating');

select has_column('users', 'id');
select has_column('users', 'isAdmin');
select has_column('users', 'username');
select has_column('users', 'allergens');
select has_column('users', 'id');

select * from finish();
rollback;
