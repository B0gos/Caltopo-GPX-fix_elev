"use_strict";
window.addEventListener('load', function() {
    // Find needed elements on page
    let gpx_file   = this.document.getElementById("gpx_file"); 
    let csv_file   = this.document.getElementById("csv_file");
    let download   = this.document.getElementById("download");
    let output_msg = this.document.getElementById("output_msg");

    // Prepare the page
    download.disabled = true;
    output_msg.innerHTML = "";

    // Add event listeners
    gpx_file.addEventListener('change', check_input);
    csv_file.addEventListener('change', check_input);
    download.addEventListener('click',  download_output);

    // Checks user input for validity
    function check_input() {
        if(!valid_gpx(gpx_file)) {
            download.disabled = true;
            output_msg.innerHTML = "Please check GPX file formatting";
        }
        else if(!valid_csv(csv_file)) {
            download.disabled = true;
            output_msg.innerHTML = "Please check CSV file formatting";
        }

        else {
            output_msg.innerHTML = "";
            download.disabled = false;
        }
    }

    // Downloads the outputted GPX
    function download_output(event) {

    }

    function valid_gpx(file_input) {
        return true;
    }

    function valid_csv(file_input) {
        return true; 
    }
    
} );