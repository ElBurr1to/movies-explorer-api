# Backend дипломной работы Яндекс Практикум.

## Домен backend части

api.elburrito.films.nomoredomainsicu.ru

## Роуты

GET /users/me  -  возвращает информацию о пользователе (email и имя)

PATCH /users/me  -  обновляет информацию о пользователе (email и имя)

GET /movies  -  возвращает все сохранённые текущим пользователем фильмы

POST /movies  -  создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

DELETE /movies/_id  -  удаляет сохранённый фильм по id
