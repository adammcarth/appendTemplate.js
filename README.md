Sick of appending large chunks of HTML from your scripts? I am.
```javascript
// Ew.
$(".sidebar").append("<div class='inner-wrapper'><div class='heading'>Welcome, " + username + "!</div><div class='about'>They're from " + country + ".</div></div>");
```

## Introducing: `.appendTemplate()`

.appendTemplate is a jQuery plugin that lets you insert a file into the DOM, after defining variables to be added within the file. Check it out...

```html
<!-- index.html -->
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="appendTemplate.jquery.min.js"></script>

<div class="container"></div>

<script type="text/javascript">
  $(".container").appendTemplate("templates/user_profile.html", {username: "@adammcarth", country: "Australia"});
</script>
```

```html
<!-- templates/user_profile.html -->
<h1>Welcome, {{username}}!</h1>
<p>They come from {{country}}.</p>
```

### Usage

```javascript
appendTemplate( file_location, variables, callback, prepend );
```

Set the final argument of the function to `true` to prepend instead of append.

### Local File System Warning

Most browsers won't allow you to open files from your local system, so if you're developing without a web server (just in plain HTML), you could run into some troubles. Google chrome users can try starting chrome with `--allow-file-access-from-files`. Read more: http://stackoverflow.com/questions/4208530/xmlhttprequest-origin-null-is-not-allowed-access-control-allow-origin-for-file

### Contributing

Contributions are always welcome:

1. Fork this repository.
2. Create a new branch: `git checkout -b my-new-feature`
3. Minify your changes using an online compressor of your choice.
4. Send in a pull request!