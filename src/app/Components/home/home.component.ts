import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../Services/youtube.service'

declare var $:any; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos:any[]=[];
  videoSeleccionado:any;

  constructor( public _youtubeSrv:YoutubeService) {
    this._youtubeSrv.getVideos()
        .subscribe(videos => this.videos = videos);
  }

  ngOnInit() {
  }

  cargarMas(){
    this._youtubeSrv.getVideos()
        .subscribe(videos => this.videos.push.apply(this.videos, videos));
  }

  verVideo(video:any){
    this.videoSeleccionado = video;
    $('#exampleModal').modal();
  }

  cerrarModal(){
    this.videoSeleccionado = null;
    $('#exampleModal').modal('hide');
  }

  
}