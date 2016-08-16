<script>
    require('./scopeheader.scss')
    export default{
       template:require('./scopeheader.html'),
       props:['scope'],
       ready(){

         this.scope = Object.assign({}, this.scope, {$$tagArr :this.scope.tag.split('#')});
       },
    }
</script>
