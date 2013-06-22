$(document).ready(function () {
	var	dropArea = document.getElementById("results"),
		fileList = document.getElementById("results");
		
	var javaOn = false;
	var designOn = false;
	var mathOn = false;

	var javaCategory = 1,
		designCategory = 2,
		mathCategory = 3;

	var fileArray = new Array();
	var categoryHash = {};

	//moves java lens up and down
	$('#javalens').click(function() {
		console.log("javalens clicked");
		if (javaOn) {
			$(this).animate({
				top: 0
			}, function() {
				javaOn = false;
				updateDocuments();	
			});
		}
		else {
			$(this).animate({
				top: 155
				
			}, function() {
				javaOn = true;
				updateDocuments();
			});	
			
			$('#lightbeam-java').delay(100).fadeIn('slow', function() {
			});
			
			$('#lightbeam-java').delay(200).fadeOut('slow', function() {
			});
		}
		
	});
	
	//moves design lens up and down
	$('#designlens').click(function() {
		console.log("designlens clicked");
		if (designOn) {
			$(this).animate({
				top: 0
			}, function() {
				designOn = false;
				updateDocuments();	
			});
		}
		else {
			$(this).animate({
				top: 155
			}, function() {
				designOn = true;
				updateDocuments();
			});	
			
			$('#lightbeam-design').delay(100).fadeIn('slow', function() {
			});
			$('#lightbeam-design').delay(200).fadeOut('slow', function() {
			});
		}
		
	});
	
	//moves mathlens up and down
	$('#mathlens').click(function() {
		console.log("mathlens clicked");
		if (mathOn) {
			$(this).animate({
				top: 0
			}, function() {
				mathOn = false;
				updateDocuments();	
			});
		}
		else {
			$(this).animate({
				top: 155
			}, function() {
				mathOn = true;
				updateDocuments();
			});	
			
			$('#lightbeam-math').delay(100).fadeIn('slow', function() {
			});
			$('#lightbeam-math').delay(100).fadeOut('slow', function() {
			});
		}
		
	});

	$('#prismsort').click(function() {
		$('#prism').delay(100).fadeOut('slow', function() {
		});
		$('#prism2').delay(500).fadeIn('slow', function() {
		});
		
		$('#prism2').delay(200).fadeOut('slow', function() {
		});
		
		$('#prism3').delay(200).fadeIn('slow', function() {
		});
		
		$('#prism3').delay(200).fadeOut('slow', function() {
		});
	});

	
	
	function updateDocuments() {
		// hide all files
		$(".file").hide();

		// if java lens is on, show java files
		if (javaOn) {
			$(".java").show();
		}

		// if design lens is on, show design files
		if (designOn) {
			$(".design").show();
		}

		// if math lens is on, show math files
		if (mathOn) {
			$(".math").show();
		}

	}

	function sortDocuments(comparator) {

		var compFunction;

		var nameComparator = function(a, b) {
			return $(a).children("strong").text() > $(b).children("strong").text() ? 1 : -1;
		};

		if (comparator == "name")
			compFunction = nameComparator;

		// only sort visible files
		$(".file:visible").sortElements(compFunction);
	}

	function uploadFile (file) {

		// add file to fileArray
		fileArray.push(file);

		var li = document.createElement("li"),
			div = document.createElement("div"),
			img,
			progressBarContainer = document.createElement("div"),
			progressBar = document.createElement("div"),
			reader,
			xhr,
			fileInfo;
			
		li.appendChild(div);
		
		/*
			If the file is an image and the web browser supports FileReader,
			present a preview in the file list
		*/
		if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
			img = document.createElement("img");
			li.appendChild(img);
			reader = new FileReader();
			reader.onload = (function (theImg) {
				return function (evt) {
					theImg.src = evt.target.result;
				};
			}(img));
			img.style.width = '50%';
			img.style.height = 'auto';
			reader.readAsDataURL(file);
		}
		
		// Present file info and append it to the list of files
		fileInfo = "<div><strong>Name:</strong> " + file.name + "</div>";
		fileInfo += "<div><strong>Size:</strong> " + parseInt(file.size / 1024, 10) + " kb</div>";
		fileInfo += "<div><strong>Type:</strong> " + file.type + "</div>";
		div.innerHTML = fileInfo;

		//li.id = file.name;
		li.style.display = 'none';
		
		var name = document.createElement('p');
		name.innerHTML = "<strong>" + file.name + "</strong>";
		name.className = "file";

		// add categories as CSS classes
		// if filename contains category name, add that as category
		// else current lens positions determines categories
		if (file.name.search("Java") != -1) {
			name.className += " java";
		}
		else if (file.name.search("Design") != -1) {
			name.className += " design";
		}
		else if (file.name.search("Math") != -1) {
			name.className += " math";
		}
		else {
			if (javaOn)
				name.className += " java";
			
			if (designOn)
				name.className += " design";

			if (mathOn)
				name.className += " math";
		}

		fileList.appendChild(name);
		name.appendChild(li);
	}
	
	function traverseFiles (files) {
		if (typeof files !== "undefined") {
			for (var i=0, l=files.length; i<l; i++) {
				uploadFile(files[i]);
			}
		}
		else {
			fileList.innerHTML = "No support for the File API in this web browser";
		}	
	}

	// drag-and-drop code
	dropArea.addEventListener("dragleave", function (evt) {
		var target = evt.target;
		
		if (target && target === dropArea) {
			this.className = "";
		}
		evt.preventDefault();
		evt.stopPropagation();
	}, false);
	
	dropArea.addEventListener("dragenter", function (evt) {
		this.className = "over";
		evt.preventDefault();
		evt.stopPropagation();
	}, false);
	
	dropArea.addEventListener("dragover", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}, false);
	
	dropArea.addEventListener("drop", function (evt) {
		traverseFiles(evt.dataTransfer.files);
		this.className = "";
		evt.preventDefault();
		evt.stopPropagation();
	}, false);										
});	

