<div id="a0-current-month" data-role="page" data-url="currentmonth">
	<div data-role="header"><h1>Current Month</h1><a href="#" class="logout" data-rel="button">Logout</a></div>
	<div data-role="content">
		<?php
			echo '<h2>'.$stash['MonthName'].'</h2>';

		?>
		<div data-role="collapsible-set" data-collapsed-icon="arrow-r">
			<div data-role="collapsible" data-collapsed="false">
				<h3>This Week</h3>
				<p>Left to spend: <span class="amount-positive">$<?php echo $income['Amount']; ?></span></p>
				<p>Left to earn: <span class="amount-positive">$<?php echo $expense['ExpensesLeft'];?></span></p>
				<a href="#">Details</a>
			</div>
			
			<div data-role="collapsible">
				<h3>Next Week</h3>
				<p>Left to spend: </p>
				<p>Left to earn: </p>
			</div>
			
		</div>
		<a href="stash/setup" class="a0-setup-link" data-changeHash="false">Setup</a>
	</div>
	
	<div data-role="footer">&copy; 2012 Zach Curtis | MDD 1206</div>
</div>