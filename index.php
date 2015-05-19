<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Advocate Things Generator</title>
    <link rel="stylesheet" style="text/css" href="vendor/deps/opt/bootstrap.css" />
    <link rel="stylesheet" style="text/css" href="assets/css/main.css" />

    <!-- DEPS -->
    <script type="text/javascript" src="vendor/deps/jquery.min.js"></script>
    <script type="text/javascript" src="vendor/deps/opt/bootstrap.min.js"></script>
    <script type="text/javascript" src="vendor/deps/underscore.js"></script>
    <script type="text/javascript" src="vendor/deps/opt/jsv.js"></script>
    <script type="text/javascript" src="vendor/lib/jsonform.js"></script>
  </head>
  <body>
    <div class="container">
      <h1>Advocate Things Generator</h1>
      
      <label for="formType">Generate content for: </label>
      <select id="formType">
        <option value="">Please Select</option>
        <optgroup label="Advocate Things Object">
          <option value="touchpoint-generate-json">Touchpoint</option>
          <option value="sharepoint-generate-json">Sharepoint</option>  
        </optgroup>

        <optgroup label="Action Templates">
          <option value="mandrill-generate-json">Mandrill</option>
          <option value="tangocard-generate-json">Tango Card</option>  
        </optgroup>        

        <optgroup label="Function Configuration">
          <option value="advocacy-function-generate-json">Advocacy Function</option>
        </optgroup>
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
      <form id="touchpoint_sum" class="generated-json small-inputs subform">
        
      </form>
      <form id="touchpoint_count" class="generated-json small-inputs subform">
        
      </form>

      <!-- result modal -->
      <div class="modal fade" id="resultModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Generated Content</h4>
            </div>
            <div class="modal-body" id="res">
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <!-- copy button -->
              <button type="button" id="copy-button" class="btn btn-primary" data-clipboard-text="">Copy to Clipboard</button>
              <script src="assets/zeroclipboard-2.2.0/dist/ZeroClipboard.js"></script>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

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