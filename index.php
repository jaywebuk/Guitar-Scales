<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="description" content="Free Guitar scale tool">
	<meta name="keywords" content="Guitar, Scales, Music, Tab, Notes">
	<meta name="author" content="Jason Robinson">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/style.css">
	<!-- <script defer src="js/fretNotes.js"></script> -->
	<script defer src="js/guitar_scales.js"></script>
	<link rel="icon" type="image/png" href="favicon.png">
	<title>Guitar Scales</title>

	<noscript>
		<p class="nojs">Your browser either doesn't support javascript, which is required for this website to work, or it is
			turned off.</p>
	</noscript>
	<!--[if IE 8]>
<p class="nojs">This website is not fully supported on IE 8. Please consider updating your browser. <a href="https://updatemybrowser.org/">updatemybrowser.org</a></p>
<![endif]-->
	<!--[if lt IE 8]>
<p class="nojs">This website is not supported on IE 7 or below. Please update your browser. <a href="https://updatemybrowser.org/">updatemybrowser.org</a></p>
<![endif]-->
	<!--[if IE 9]>
<p class="nojs">This website is not fully supported on IE 9. Please consider updating your browser. <a href="https://updatemybrowser.org/">updatemybrowser.org</a></p>
<![endif]-->
	<!--[if lte IE 9]>
<link rel="stylesheet" href="css/ie9.css">
<![endif]-->

</head>
<!-- <script>function docReady(){}</script> -->
<body onload='getScale("E")'>

	<div id="loading">
		<img src="images/loading.gif" alt="loading">
	</div>
	<div id="wrapper" class="wrapper">
		<header class="main-header">
				<div>
					<h1>Guitar Scales</h1>
				</div>
			<ul class="social">
					<li><a class="" href="/" title="My Projects" data-link="jnrwebdev" target="_blank">
							<img src="header-images/site_logo_32.png" alt="Projects">
						</a></li>
					<li><a class="" href="https://twitter.com/jayuk79" target="_blank" rel="noopener">
							<img src="header-images/twitter_32.png" alt="Twitter" title="Twitter" alt="Twitter">
						</a></li>
					<li><a class="" href="https://github.com/jayuk79" target="_blank" rel="noopener">
							<img src="header-images/GitHub_32.png" alt="Twitter" title="GitHub" alt="GitHub">
						</a></li>
			</ul>

		</header>

		<div class="scaleTitle-container">
			<div class="scaleTitle">
				<h2 id="scaleTitle" class="scaleTitle">&nbsp;</h2>
				<p id="notes" class="notes"></p>
			</div>
		</div>

		<div id="main-neck-container" class="main-neck-container">
			<div id="neck-container" class="neck-container">
				<div id="neck1" class="neck neck1">
					<div class="string string1"></div>
					<div class="string string2"></div>
					<div class="string string3"></div>
					<div class="string string4"></div>
					<div class="string string5"></div>
					<div class="string string6"></div>
					<div id="fretNut" class="fret fretNut first-twelve"></div>
					<div id="fret0" class="fret fret0 first-twelve">
						<div id="E1F0" class="finger finger0 E1open">
							<span class="fretNote"></span>
						</div>
						<div id="BF0" class="finger finger0 Bopen">
							<span class="fretNote"></span>
						</div>
						<div id="GF0" class="finger finger0 Gopen">
							<span class="fretNote"></span>
						</div>
						<div id="DF0" class="finger finger0 Dopen">
							<span class="fretNote"></span>
						</div>
						<div id="AF0" class="finger finger0 Aopen">
							<span class="fretNote"></span>
						</div>
						<div id="E2F0" class="finger finger0 E2open">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret1 first-twelve" id="fret1">
						<div class="fret-num">1</div>
						<div id="E1F1" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF1" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF1" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF1" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF1" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F1" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret2 first-twelve" id="fret2">
						<div class="fret-num">2</div>
						<div id="E1F2" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF2" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF2" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF2" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF2" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F2" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret3 first-twelve" id="fret3">
						<div class="fret-num">3</div>
						<div class="dot dots"></div>
						<div id="E1F3" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF3" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF3" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF3" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF3" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F3" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret4 first-twelve" id="fret4">
						<div class="fret-num">4</div>
						<div id="E1F4" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF4" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF4" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF4" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF4" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F4" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret5 first-twelve" id="fret5">
						<div class="fret-num">5</div>
						<div class="dot dots"></div>
						<div id="E1F5" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF5" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF5" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF5" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF5" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F5" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret6 first-twelve second-twelve" id="fret6">
						<div class="fret-num">6</div>
						<div id="E1F6" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF6" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF6" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF6" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF6" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F6" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
				</div>
				<div id="neck2" class="neck neck2">
					<div class="string string1"></div>
					<div class="string string2"></div>
					<div class="string string3"></div>
					<div class="string string4"></div>
					<div class="string string5"></div>
					<div class="string string6"></div>
					<div class="fret fret7 first-twelve second-twelve" id="fret7">
						<div class="fret-num">7</div>
						<div class="dot dots"></div>
						<div id="E1F7" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF7" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF7" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF7" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF7" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F7" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret8 first-twelve second-twelve" id="fret8">
						<div class="fret-num">8</div>
						<div id="E1F8" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF8" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF8" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF8" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF8" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F8" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret9 first-twelve second-twelve" id="fret9">
						<div class="fret-num">9</div>
						<div class="dot dots"></div>
						<div id="E1F9" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF9" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF9" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF9" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF9" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F9" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret10 first-twelve second-twelve" id="fret10">
						<div class="fret-num">10</div>
						<div id="E1F10" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF10" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF10" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF10" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF10" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F10" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret11 first-twelve second-twelve" id="fret11">
						<div class="fret-num">11</div>
						<div id="E1F11" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF11" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF11" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF11" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF11" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F11" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret12 first-twelve second-twelve third-twelve" id="fret12">
						<div class="fret-num">12</div>
						<div class="doubledot1 dots"></div>
						<div class="doubledot2 dots"></div>
						<div id="E1F12" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF12" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF12" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF12" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF12" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F12" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
				</div>
				<div id="neck3" class="neck neck3">
					<div class="string string1"></div>
					<div class="string string2"></div>
					<div class="string string3"></div>
					<div class="string string4"></div>
					<div class="string string5"></div>
					<div class="string string6"></div>
					<div class="fret fret13 second-twelve third-twelve" id="fret13">
						<div class="fret-num">13</div>
						<div id="E1F13" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF13" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF13" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF13" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF13" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F13" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret14 second-twelve third-twelve" id="fret14">
						<div class="fret-num">14</div>
						<div id="E1F14" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF14" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF14" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF14" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF14" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F14" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret15 second-twelve third-twelve" id="fret15">
						<div class="fret-num">15</div>
						<div class="dot dots"></div>
						<div id="E1F15" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF15" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF15" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF15" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF15" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F15" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret16 second-twelve third-twelve" id="fret16">
						<div class="fret-num">16</div>
						<div id="E1F16" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF16" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF16" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF16" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF16" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F16" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret17 second-twelve third-twelve" id="fret17">
						<div class="fret-num">17</div>
						<div class="dot dots"></div>
						<div id="E1F17" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF17" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF17" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF17" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF17" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F17" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret18 second-twelve third-twelve" id="fret18">
						<div class="fret-num">18</div>
						<div id="E1F18" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF18" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF18" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF18" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF18" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F18" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
				</div>
				<div id="neck4" class="neck neck4">
					<div class="string string1"></div>
					<div class="string string2"></div>
					<div class="string string3"></div>
					<div class="string string4"></div>
					<div class="string string5"></div>
					<div class="string string6"></div>
					<div class="fret fret19 third-twelve" id="fret19">
						<div class="fret-num">19</div>
						<div class="dot dots"></div>
						<div id="E1F19" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF19" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF19" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF19" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF19" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F19" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret20 third-twelve" id="fret20">
						<div class="fret-num">20</div>
						<div id="E1F20" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF20" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF20" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF20" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF20" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F20" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret21 third-twelve" id="fret21">
						<div class="fret-num">21</div>
						<div class="dot dots"></div>
						<div id="E1F21" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF21" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF21" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF21" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF21" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F21" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret22 third-twelve" id="fret22">
						<div class="fret-num">22</div>
						<div id="E1F22" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF22" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF22" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF22" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF22" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F22" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret23 third-twelve" id="fret23">
						<div class="fret-num">23</div>
						<div id="E1F23" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF23" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF23" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF23" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF23" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F23" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
					<div class="fret fret24 third-twelve" id="fret24">
						<div class="fret-num">24</div>
						<div class="doubledot1 dots"></div>
						<div class="doubledot2 dots"></div>
						<div id="E1F24" class="finger E1">
							<span class="fretNote"></span>
						</div>
						<div id="BF24" class="finger B">
							<span class="fretNote"></span>
						</div>
						<div id="GF24" class="finger G">
							<span class="fretNote"></span>
						</div>
						<div id="DF24" class="finger D">
							<span class="fretNote"></span>
						</div>
						<div id="AF24" class="finger A">
							<span class="fretNote"></span>
						</div>
						<div id="E2F24" class="finger E2">
							<span class="fretNote"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="formContainer" class="formContainer">
			<div id="keySelectDiv" class="form-div">
				<form id="keySelectForm">
				<label for="keySelect">Key</label><br>
					<select name="key" id="keySelect" size=""
						onChange="javascript:getScale(this.value)">
						<!-- for the sake of compatibility &sharp; and &flat; are not used here-->
						<option value="Ab" class="menuTitle">Ab</option>
						<option id="A" value="A" class="menuTitle">A</option>
						<option id="Bb" value="Bb" class="menuTitle">Bb</option>
						<option id="B" value="B" class="menuTitle">B</option>
						<option id="C" value="C" class="menuTitle">C</option>
						<option id="C#" value="C#" class="menuTitle">C#</option>
						<option id="Db" value="Db" class="menuTitle" data-minor="">Db</option>
						<option id="D" value="D" class="menuTitle">D</option>
						<option value="Eb" class="menuTitle">Eb</option>
						<option id="E" value="E" class="menuTitle" selected="seleced" default>E</option>
						<option id="F" value="F" class="menuTitle">F</option>
						<option id="F#" value="F#" class="menuTitle">F#</option>
						<option id="G" value="G" class="menuTitle">G</option>
					</select>
				</form>
			</div>
			<div id="modeSelectDiv" class="form-div">
				<form id="modeSelectForm">
					<label for="modeSelect">Mode</label><br>
					<select name="mode" id="modeSelect" size=""
						onChange="javascript:changeMode(this.value)">
						<option id="Major" value="Major" class="modeTitle" selected="selected">Major</option>
						<option id="Dorian" class="modeTitle" value="Dorian">Dorian</option>
						<option id="Phrygian" class="modeTitle" value="Phrygian">Phrygian</option>
						<option id="Lydian" class="modeTitle" value="Lydian">Lydian</option>
						<option id="Mixolydian" class="modeTitle" value="Mixolydian">Mixolydian</option>
						<option id="Aeolian" class="modeTitle" value="Aeolian">Aeolian</option>
						<option id="Locrian" class="modeTitle" value="Locrian">Locrian</option>
						<option id="Natural_Minor" class="modeTitle" value="Natural Minor">Natural Minor</option>
						<option id="Harmonic_Minor" class="modeTitle" value="Harmonic Minor">Harmonic Minor</option>
						<option id="Melodic_Minor" class="modeTitle" value="Melodic Minor">Melodic Minor</option>
						<option id="Minor_Pentatonic" class="modeTitle" value="Minor Pentatonic">Minor Pentatonic</option>
						<option id="Blues" value="Blues" class="modeTitle">Blues</option>
					</select>
				</form>
			</div>
			
			<div id="tuningSelectDiv" class="form-div">
				<form id="tuningSelectForm">
				<label for="tuningSelect">Tuning</label><br>
					<select name="tuning" id="tuningSelect" size=""
						onChange="javascript:changeTuning(this.value)">
						<option id="standardE" value="standardE" class="tuning" selected="selected">Standard E</option>
						<option value="dropD" class="tuning">Drop D</option>
						<option value="openD" class="tuning">Open D</option>
						<option value="dropC" class="tuning">Drop C</option>
						<option value="DADGAD" class="tuning">DADGAD</option>
					</select>
				</form>
			</div>
			<div id="fingerboardSelectDiv" class="form-div">
				<form id="fingerboardSelectForm" autocomplete="off">
				<label for="fingerboardSelect">Fingerboard</label><br>
					<select name="fingerboard" id="fingerboardSelect" size="" onChange="javascript:changeFingerboard(this)">
						<option value="rosewood">Rosewood</option>
						<option value="maple" selected="selected">Maple</option>
						<option value="ebony">Ebony</option>
					</select>
				</form>
			</div>

			<button id="show-notes" class="button">Notes On / Off</button>
			<button id="show-frets" class="button">Frets On / Off</button>
		</div>
		<div class="chords-title">
			<h1>Chords</h1>
		</div>

		<div id="chords-container" class="chords-container">
			<div id="chords-body" class="chords-body"></div>
			<div id="more-chords" class="more-chords">
				<div id="more-chords-close" class="more-chords-close">X</div>
				<h1 id="more-chords-header" class="more-chords-header"></h1>

				<div id="more-chords-body" class="more-chords-body"></div>
				<p id="more-key-chords" class="more-key-chords">Click a chord to enlarge, again to restore</p>
			</div>
		</div>
		<div id="chords-zoom" class="chords-zoom">
			<img id="chord-zoom-image" alt="chord-zoom-image">
		</div>
		<div id="footer">
			<div>
				<p class="copyright">&copy; 2016 - <span id="currentYear"></span> <a href="/">Jason Robinson.</a> All rights reserved</p>
			</div>
		</div>

	</div>
	<script>
		let date = new Date();
		document.getElementById("currentYear").textContent = date.getFullYear();
	</script>
</body>

</html>