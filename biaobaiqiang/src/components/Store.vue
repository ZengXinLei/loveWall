
<script>
    // import Vue from 'vue'
    import Vuex from 'vuex'
    import createPersistedState from "vuex-persistedstate"
        let state={
            user: {},
            permissions:0
        }
        let mutations={
            init(state, user) {
                state.user = user
            },
            out() {
                this.state.user = null
            },
            setPermissions(state,level){
                state.permissions=level
            }
        }
    // Vue.use(Vuex)
    export default new Vuex.Store({
        state,
        mutations,
        plugins:[createPersistedState()]
    })
</script>


