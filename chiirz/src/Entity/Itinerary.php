<?php

namespace App\Entity;

use App\Repository\ItineraryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ItineraryRepository::class)]
class Itinerary
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $price = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $distance = null;

    #[ORM\ManyToOne(inversedBy: 'itineraries')]
    private ?User $fk_user = null;

    #[ORM\ManyToOne(inversedBy: 'itineraries')]
    #[ORM\JoinColumn(nullable: false)]
    private ?City $fk_city = null;

    #[ORM\OneToMany(mappedBy: 'fk_itinerary', targetEntity: Comment::class, orphanRemoval: true)]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'fk_itinerary', targetEntity: Like::class)]
    private Collection $likes;

    #[ORM\Column(nullable: true)]
    private ?array $bar = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $img = null;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->likes = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(?int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getDistance(): ?string
    {
        return $this->distance;
    }

    public function setDistance(?string $distance): self
    {
        $this->distance = $distance;

        return $this;
    }

    public function getFkUser(): ?User
    {
        return $this->fk_user;
    }

    public function setFkUser(?User $fk_user): self
    {
        $this->fk_user = $fk_user;

        return $this;
    }

    public function getFkCity(): ?City
    {
        return $this->fk_city;
    }

    public function setFkCity(?City $fk_city): self
    {
        $this->fk_city = $fk_city;

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setFkItinerary($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getFkItinerary() === $this) {
                $comment->setFkItinerary(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Like>
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes->add($like);
            $like->setFkItinerary($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->removeElement($like)) {
            // set the owning side to null (unless already changed)
            if ($like->getFkItinerary() === $this) {
                $like->setFkItinerary(null);
            }
        }

        return $this;
    }

    public function getBar(): array
    {
        return $this->bar;
    }

    public function setBar(?array $bar): self
    {
        $this->bar = $bar;

        return $this;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(?string $img): self
    {
        $this->img = $img;

        return $this;
    }
}
