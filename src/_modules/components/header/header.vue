<template lang='pug'>
header.header
	.header__greet {{greet}}
</template>




<script>
	var vheader = {
		data: function(){
			return {
				greet: 'Hello Vue!'
			}
		}
	}
	module.exports = vheader;
</script>




<style lang='scss'>
	.header{
		width: 100%;
		background-color: #bababa;
		
		padding: 12px 0;
		&__greet{
			color: #666;
			text-align: center;
		}
	}
</style>