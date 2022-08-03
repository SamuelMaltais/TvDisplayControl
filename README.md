# TvDisplayForSchool

This webserver is used to have a simple uploading interface to
control the school's tv slides. The client uploads pictures to the server
and the server saves them and serves them to the client on the display tab.

You can use this for your own school ! To do that:

1: Change the specialCode in the server post requests. The one I use is different in production and yours should too.

2: Deploy the express app. Heroku will host it for free.

3: Change the upload links on the client. Every fetch should point to you express app.

4: Deploy the react app(clientTvControl). I suggest doing npm run build and putting the build folder on any platform that will host it.
I used netlify.

note: the public folder cannot be empty when you publish the express app.





The client has 3 pages, delete, display and the root path,
with all routes managed by react-router.

The server handles get post request for uploads on /upload
and delete on /deleteRequest. It also does get request for display
and delete, the difference between the two being that delete ignores
the dates of the images.
