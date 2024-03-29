-- DATABASE TESTS

begin;
select plan( 4 );

-- CHECK THAT ALL TABLES EXIST IN DATABASE
select has_table( 'enquiries' );
select has_table( 'fountain_allergens' );
select has_table( 'fountain_allergens_ratings' );
select has_table( 'users' );

select * from finish();
rollback;
