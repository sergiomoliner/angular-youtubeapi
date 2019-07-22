import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3/";
  private apikey:string = "AIzaSyDZ4RqCX0K2lnQHWiPCCBSbwJ0B-jQKm1I";
  private playlist:string = "UUwoMnHuOQrhKj7r4-Onh0wg"
  private nextPageToken:string = "";

  //Para poder hacer la petición GET
  constructor(public http:Http) { }

  getVideos(){
    let url = this.youtubeUrl + 'playlistItems';
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist);
    params.set('key', this.apikey);
    
    if(this.nextPageToken){
      params.set('pageToken', this.nextPageToken)
    }

    return this.http.get(url,{search:params})
            .map(resp => {
              console.log(resp.json());
              this.nextPageToken = resp.json().nextPageToken;

              let videos:any[]=[];
              for ( let video of resp.json().items){
                let snippet = video.snippet;
                videos.push(snippet);
              }
              return videos;
            })
  }
}