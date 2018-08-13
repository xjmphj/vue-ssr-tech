
//样式需要独立出来，单独引入
import '../assets/styles/footer.styl';

export default {
  data(){
    return {
      author:'xiejunmei'
    }
  },
  render(){
      return (
          <div id="footer">
              <span>Power by {this.author}</span>
              <br/>
              <span>Hosted by Coding Pages</span>
          </div>
      );
  }
}