$each($all('form input, form textarea'), el => $e(el, 'focus', function() {
	el.parentNode.querySelector('label').classList.add('active');
}));

$each($all('form input, form textarea'), el => $e(el, 'blur', function() {
	if (el.value.length == 0) el.parentNode.querySelector('label').classList.remove('active');
}));
