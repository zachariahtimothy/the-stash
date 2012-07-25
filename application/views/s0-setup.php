<div id="s0-setup" data-role="page" data-changeHash="false">
	<div data-role="header"><a href="stash/" data-icon="arrow-l">Back</a><h1>Setup</h1><a href="#" class="logout" data-rel="button">Logout</a></div>
	<div data-role="content">
		<h2>Setup</h2>
		<form action="stash/setup" method="post">
			<label>Income:</label>
			<input type="text" name="income" />
			<br />
			<select name="frequency">
				<option value="0" selected="selected">Frequency</option>
				<?php
					foreach ($frequencies as $value) {
						echo '<option value="'.$value['Id'].'">'.$value['Name'].'</option>';
					}
				?>
			</select>
			<br />
			<a href="#">Expenses</a>
			<div class="s0-save-button-container"><button type="submit">Save</button></div>
		</form>
	</div>
	
	<div data-role="footer">&copy; 2012 Zach Curtis | MDD 1206</div>
</div>