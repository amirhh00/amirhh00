## Projects

_**To see more, visit my [Website](amirhossein-esmaeili.com)**_.

{{#projects}}

{{markdown}}

**worked on**: {{metadata.workedOn}}

**tools used**: {{metadata.tools}}

{{#mediaFiles}}

{{#isImage}}

<img src="{{{url}}}" alt="{{alt}}" width="320">

{{/isImage}}

{{#isVideo}}

<video width="320" controls loop muted autoplay>
<source src="https://raw.githubusercontent.com/amirhh00/amirhh00/refs/heads/main/{{{url}}}" type="video/mp4">
</video>

{{/isVideo}}

{{/mediaFiles}}

{{/projects}}
