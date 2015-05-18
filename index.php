<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Advocate Things Generator</title>
    <link rel="stylesheet" style="text/css" href="vendor/deps/opt/bootstrap.css" />
    <link rel="stylesheet" style="text/css" href="assets/css/main.css" />

    <!-- DEPS -->
    <script type="text/javascript" src="vendor/deps/jquery.min.js"></script>
    <script type="text/javascript" src="vendor/deps/underscore.js"></script>
    <script type="text/javascript" src="vendor/deps/opt/jsv.js"></script>
    <script type="text/javascript" src="vendor/lib/jsonform.js"></script>
  </head>
  <body>
    <div class="container">
      <h1>Advocate Things Generator</h1>
      
      <label for="formType">Generate content for: </label>
      <select id="formType">
        <option value="">Please select</option>
        <option value="touchpoint-generate-json">Touchpoint</option>
        <option value="sharepoint-generate-json">Sharepoint</option>
        <option value="mandrill-generate-json">Mandrill</option>
        <option value="tangocard-generate-json">Tango Card</option>
        <option value="advocacy-function-generate-json">Advocacy Function</option>
      </select>

      <form id="main" class="generated-json small-inputs">
      </form>
      <form id="touchpoint-generate-json" class="generated-json">
      </form>
      <form id="sharepoint-generate-json" class="generated-json">
      </form>
      <form id="mandrill-generate-json" class="generated-json">
      </form>
      <form id="tangocard-generate-json" class="generated-json small-inputs">
      </form>
      <form id="advocacy-function-generate-json" class="generated-json small-inputs">
      </form>
      <div id="res" class="alert"></div>

      <!-- JSONForm generator -->
      <script type="text/javascript" src="assets/js/main-form.js"></script>
      <script type="text/javascript" src="assets/js/sharepoint-form.js"></script>
      <script type="text/javascript" src="assets/js/touchpoint-form.js"></script>
      <script type="text/javascript" src="assets/js/mandrill-form.js"></script>
      <script type="text/javascript" src="assets/js/tangocard-form.js"></script>
      <script type="text/javascript" src="assets/js/advocacy-function-form.js"></script>

      <script type="text/javascript" src="assets/js/utils.js"></script>

    </div>
  </body>
</html>