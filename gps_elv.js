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
        }
        else if(!valid_csv(csv_file)) {
        }

        else {
            output_msg.innerHTML = "";
            download.disabled = false;
        }
    }

    // Downloads the outputted GPX
    function download_output() {
        download.disabled = true;
        read_gpx();
    }



    function valid_gpx(file_input) {
        return true; 
    }

    function valid_csv(file_input) {
        return true; 
    }



    // Source - https://stackoverflow.com/a
    // Posted by Matěj Pokorný, modified by community. See post 'Timeline' for change history
    // Retrieved 2025-11-15, License - CC BY-SA 3.0

    function download_file(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }



    function read_csv(gpxDOM, track_s) {
        let file   = csv_file.files[0];
        let reader = new FileReader();

        reader.onload = function() {
            let data = reader.result;
            let lines = data.split(/\r\n|\n/);
            let length = lines[0].split(",").length;
            
            for(let i = 1; i < lines.length; i++) {
                let line = lines[i].split(",");
                if(line.length == length) {
                    // Create track point
                    let trkpt = gpxDOM.createElement('trkpt');
                    trkpt.setAttribute("lat", line[0]);
                    trkpt.setAttribute("lon", line[1]);

                    // Add elevation data
                    let ele = gpxDOM.createElement('ele');
                    ele.innerHTML = line[2];
                    trkpt.appendChild(ele);

                    // Add this point to track segment
                    track_s.appendChild(trkpt); 
                }
            }

            console.log(gpxDOM);
            let xmlSer = new XMLSerializer();
            let plainText = xmlSer.serializeToString(gpxDOM);
            download_file("output.gpx", plainText);
            download.disabled = false;


        }

        reader.onerror= function() {
        }

        if(file)
            reader.readAsText(file);
    }

    function read_gpx() {
        let file   = gpx_file.files[0];
        let reader = new FileReader();

        reader.onload = function() {
            let data = reader.result;

            if(window.DOMParser)
            {
                let parser = new DOMParser();
                let gpxDOM = parser.parseFromString(data, "text/xml");
                let track_s = gpxDOM.querySelectorAll('trkseg');
                
                if(track_s.length > 1) {
                    output_msg.innerHTML = "Multiple tracks found! Unfortunately this tool can only edit one track at a time";
                }
                else {
                    track_s[0].innerHTML = "";
                    read_csv(gpxDOM, track_s[0]);
                }
            }
            else {
            }
        }

        reader.onerror= function() {
        }

        if(file)
            reader.readAsText(file);
    }
} );